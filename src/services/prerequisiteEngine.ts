import type { DomainId, TrackedCertState, Certification } from '../types';
import { DOMAINS_DATA, CERTIFICATIONS_DATA } from '../data/certsData';

/**
 * Computes the visual state for all certifications within a given domain
 * based on the user's completed certifications map.
 * 
 * Rules:
 * 1. Completed: If completedCerts[certId] is true.
 * 2. Available: If NOT completed, AND all prerequisites are present in completedCerts.
 * 3. Locked: If NOT completed, AND at least one prerequisite is missing.
 */
export function computeDomainCertStates(
  domainId: DomainId,
  completedCerts: Record<string, boolean>
): TrackedCertState[] {
  const domain = DOMAINS_DATA[domainId];
  if (!domain) return [];

  return domain.certIds.map((certId) => {
    const cert = CERTIFICATIONS_DATA[certId];
    if (!cert) {
      throw new Error(`Certification ${certId} not found in database`);
    }

    const isCompleted = !!completedCerts[certId];
    const missingPrerequisites = cert.prerequisites.filter(
      (prereqId) => !completedCerts[prereqId]
    );

    let status: 'completed' | 'available' | 'locked';
    if (isCompleted) {
      status = 'completed';
    } else if (missingPrerequisites.length === 0) {
      status = 'available';
    } else {
      status = 'locked';
    }

    return {
      ...cert,
      status,
      missingPrerequisites,
    };
  });
}

/**
 * Checks if a specific certification is currently available to be marked complete.
 */
export function isCertAvailable(
  certId: string,
  completedCerts: Record<string, boolean>
): boolean {
  const cert = CERTIFICATIONS_DATA[certId];
  if (!cert) return false;
  if (completedCerts[certId]) return false; // Already completed

  return cert.prerequisites.every((prereqId) => !!completedCerts[prereqId]);
}

/**
 * Returns the first "available" (current step) certification in a domain path,
 * which is the prime candidate for the AI explanation.
 */
export function getNextRecommendedAvailableCert(
  domainId: DomainId,
  completedCerts: Record<string, boolean>
): Certification | null {
  const certStates = computeDomainCertStates(domainId, completedCerts);
  const nextAvailable = certStates.find((c) => c.status === 'available');
  return nextAvailable || null;
}

/**
 * Computes progress stats for a single domain.
 */
export function getDomainProgressStats(
  domainId: DomainId,
  completedCerts: Record<string, boolean>
) {
  const certStates = computeDomainCertStates(domainId, completedCerts);
  const total = certStates.length;
  const completed = certStates.filter((c) => c.status === 'completed').length;
  const available = certStates.filter((c) => c.status === 'available').length;
  const locked = certStates.filter((c) => c.status === 'locked').length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  const totalEstimatedHours = certStates.reduce((acc, c) => acc + c.estimatedHours, 0);
  const completedHours = certStates
    .filter((c) => c.status === 'completed')
    .reduce((acc, c) => acc + c.estimatedHours, 0);

  return {
    total,
    completed,
    available,
    locked,
    percentage,
    totalEstimatedHours,
    completedHours,
    isFullyCompleted: total > 0 && completed === total,
  };
}

/**
 * Computes global progress statistics across all domains.
 */
export function getOverallProgressStats(completedCerts: Record<string, boolean>) {
  const domainIds = Object.keys(DOMAINS_DATA) as DomainId[];
  const allUniqueCertIds = Array.from(
    new Set(domainIds.flatMap((d) => DOMAINS_DATA[d].certIds))
  );

  const total = allUniqueCertIds.length;
  const completed = allUniqueCertIds.filter((id) => !!completedCerts[id]).length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return {
    totalCerts: total,
    completedCertsCount: completed,
    overallPercentage: percentage,
    domainStats: domainIds.map((id) => ({
      domainId: id,
      domainName: DOMAINS_DATA[id].name,
      ...getDomainProgressStats(id, completedCerts),
    })),
  };
}

import ViewSetAPI from "@/app/api/ViewSetAPI";

const candidateAPI = new ViewSetAPI("candidate");
const interviewAPI = new ViewSetAPI("interview");
const jobAPI = new ViewSetAPI("job");

export async function fetchAllCandidatesPerStages() {
    const interviewsData = await interviewAPI.nonStandardRequestAggregate('GET', 'get_all_candidates_per_interview_stage')
    return interviewsData
}

export async function fetchAllCandidates() {
    return await candidateAPI.get("")
}

export async function createCandidate(body: {}) {
    return await candidateAPI.post(body);
}

export async function deleteCandidate(candidateID: string) {
    return await candidateAPI.delete(candidateID)
}

export async function updateFeedback(candidateID: string, feedback: string) {
    const body = {
        'feedback': feedback
    }
    return await candidateAPI.update(candidateID, body)
}

export async function fetchAllCandidatesForJob(jobID: string, body: {}) {
    return await interviewAPI.nonStandardRequestIndividual('GET', 'get_all_candidates_for_job', jobID, body)
}

export async function fetchAllInterviewStages() {
    return await interviewAPI.nonStandardRequestAggregate('GET', 'get_all_interview_stages')
}

export async function fetchInterviewStagesPerJob(jobID: string, body: {}) {
    return interviewAPI.nonStandardRequestIndividual('GET', 'get_interview_stages_per_job', jobID, body)
}

export async function fetchAllJobs() {
    return await jobAPI.get("")
}

export async function fetchAllArchivedJobs() {
    return await jobAPI.nonStandardRequestAggregate('GET', 'get_archived_jobs')
}

export async function editJobDescription(jobID: string, description: string) {
    const body = {
        'description': description
    }
    return await jobAPI.update(jobID, body)
}

export async function archiveJob(jobID: string, archiveOrNot: boolean) {
    const body = {
        'is_archived': archiveOrNot
    }
    return await jobAPI.update(jobID, body)
}

export async function deleteJob(jobID: string) {
    return await jobAPI.delete(jobID)
}

export async function assignCandidateToJob(candidateID: string, jobID: string, targetInterviewStage: string) {
    const body = {
        'job_id': jobID,
        'target_interview_stage': targetInterviewStage
    }
    return await interviewAPI.nonStandardRequestIndividual('POST', 'assign_candidate_to_job', candidateID, body)
}

export async function assignCandidateToInterviewStage(candidateID: string, interviewID: string, targetInterviewStage: string) {;
    const body = {
      'interview_id': interviewID,
      'target_interview_stage': targetInterviewStage
    }
    return await interviewAPI.nonStandardRequestIndividual('PATCH', 'assign_candidate_to_interview_stage', candidateID, body)
}

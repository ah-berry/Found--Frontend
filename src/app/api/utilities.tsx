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

export async function fetchAllCandidatesForJob(jobID: string, body: {}) {
    return await interviewAPI.nonStandardRequestIndividual('GET', 'get_all_candidates_for_job', jobID, body)
}

export async function fetchInterviewStagesPerJob(jobID: string, body: {}) {
    return interviewAPI.nonStandardRequestIndividual('GET', 'get_interview_stages_per_job', jobID, body)
}

export async function createCandidate(body: {}) {
    return await candidateAPI.post(body);
}

export async function fetchAllJobs() {
    return await jobAPI.get("")
}

export async function fetchAllArchivedJobs() {
    return await jobAPI.nonStandardRequestAggregate('GET', 'get_archived_jobs')
}

export async function assignCandidateToInterviewStage(candidateID: string, interviewID: string, targetInterviewStage: string) {;
    const body = {
      'interview_id': interviewID,
      'target_interview_stage': targetInterviewStage
    }
    return await interviewAPI.nonStandardRequestIndividual('PATCH', 'assign_candidate_to_interview_stage', candidateID, body)
}

//   async function fetchCandidateData() {
//     const candidatesData = await candidateAPI.get("");
//     console.log("candidatesData", candidatesData);
//   }

//   async function fetchSingleCandidateData() {
//     const candidatesData = await candidateAPI.get("d84b71ed-2405-4ebc-a416-0125b7dedc58");
//     console.log("candidatesData", candidatesData);
//   }

//   async function createSingleCandidate() {
//     const body = {
//       name: 'Candidate 4',
//       email: 'candidate4@gmail.com',
//       feedback: 'This is the feedback for candidate 4.'
//     }
//     const candidateData = await candidateAPI.post(body);
//     console.log('candidateData', candidateData);

//   }

//   async function deleteSingleCandidate() {
//     const candidateData = await candidateAPI.delete('b0a9cc08-0d6d-44fb-9941-dd1f5f77f2ad');
//     console.log('candidateData', candidateData);

//   }

//   async function updateSingleCandidate() {
//     const idToChange = '26d46d64-11df-45aa-bdb7-c69cbec04ec9';
//     const body = {
//       name: 'Candidate 1,000,000',
//       email: 'candidateMillion@gmail.com',
//       feedback: 'This is the feedback for candidate million.'
//     }
//     const candidateData = await candidateAPI.update(idToChange, body);
//     console.log('candidateData', candidateData);

//   }

//   async function readJobPosting() {
//     const jobsData = await jobAPI.get("9a2f45e9-0515-4b88-bafc-e05f0cce058e");
//     console.log("jobsData", jobsData);
//   }

//   async function createJobPosting() {
//     const body = {
//       name: 'Software Architect',
//       description: 'This is a job description.'
//     }
//     const jobsData = await jobAPI.post(body);
//     console.log('jobsData', jobsData);

//   }

//   async function updateJobPosting() {
//     const idToChange = '37d4bd86-01b2-4d73-9529-023b6db30004';
//     const body = {
//       name: 'CEO',
//       description: 'This is a job description.'
//     }
//     const jobsData = await jobAPI.update(idToChange, body);
//     console.log('jobsData', jobsData);

//   }

//   async function archiveJobPosting() {
//     const idToChange = '37d4bd86-01b2-4d73-9529-023b6db30004';
//     const body = {
//       is_archived: true,
//     }
//     const jobsData = await jobAPI.update(idToChange, body);
//     console.log('jobsData', jobsData);
//   }

//   async function deleteJobPosting() {
//     const idToDelete = '37d4bd86-01b2-4d73-9529-023b6db30004';
//     const jobsData = await jobAPI.delete(idToDelete);
//     console.log('jobsData', jobsData);
//   }

//   async function assignCandidateToJob() {
//     const candidateID = 'd84b71ed-2405-4ebc-a416-0125b7dedc58';
//     const jobID = '9a2f45e9-0515-4b88-bafc-e05f0cce058e';
//     const body = {
//       'job_id': jobID,
//     }
//     const interviewsData = await interviewAPI.nonStandardRequest('POST', 'assign_candidate_to_job', candidateID, body)
//     console.log('interviewsData', interviewsData)
//   }

//   async function assignCandidateToInterviewStage() {
//     const candidateID = 'd84b71ed-2405-4ebc-a416-0125b7dedc58';
//     const body = {
//       'interview_id': '72e61c68-58a4-4169-a4aa-30f49d5841af',
//       'target_interview_stage': "interviews_passed"
//     }
//     const interviewsData = await interviewAPI.nonStandardRequest('POST', 'assign_candidate_to_interview_stage', candidateID, body)
//     console.log('interviewsData', interviewsData)

//   }
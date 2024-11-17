# Found - Frontend

This is the frontend of Found - a simplified version of [_Wellfound_](https://wellfound.com/) (previously AngelList) focused on basic candidate management from a hiring manager's point of view. The user interface is an admin-like dashboard that enables the manipulation of candidates, job postings, an archive of the job postings, and the assignment of candidates to interview stages of a job.

## Table of Contents
* [Technologies Used](#technologies-used)
* [Usage](#usage)
* [Setup](#setup)
* [Future Developments](#future-developments)
* [Contact](#contact)

## Technologies Used

* Next.js v2.4.2
* React v18
* TypeScript v5
* Chakra UI v2.10.2

## Usage

The usage of Found will be segmented by the features/functionalities relevant to each page:

* Pipeline
* Candidates
* Jobs
* Archive

The "Candidate" and "Job" objects seen in the forthcoming GIFs are used for demonstration purposes and will not be present on a new running instance of this GitHub project cloned. 

### Pipeline

The "Pipeline" page is the entry point and home page of Found. A hollistic drag and drop column-wise overview of candidates within interview stages of a job or all jobs can be seen.

#### Feature: Viewing interview stages of candidates by job selector

![Example gif of viewing interview stages of candidates by job selector](./public/pipeline_job_selector_feature.gif)

The interview stages of candidates for a certain job can be selected by the top right dropdown menu. The "All" option will show the interview stages of all candidates across all jobs.
If the job selector is unused, it will default to the "All" option.

#### Feature: Assigning candidates to interview stages by drag and drop

![Example gif of assigning candidates to interview stages by drag and drop](./public/pipeline_candidate_drag_and_drop_assignment_feature.gif)

Candidates can be assigned to different interview stages of a job by dragging and dropping the card with their name to the target interview stage. The GIF full page 
refreshes towards the end and indicates that the candidate's latest interview stage assignment before the page refresh was correctly recorded on the backend.

#### Feature: Assigning candidates to interview stages by "Assign candidate" button

![Example gif of assigning candidates to interview stages by "Assign candidate" button](./public/pipeline_candidate_assignment_by_button_feature.gif)

Candidates can be assigned to different interview stages of a job by using the "Assign candidate" button. Upon clicking the "Assign candidate" button, the user will be prompted to select the desired candidate, job, and interview stage. This button allows assigning candidates to interview stages of other jobs, an ability not achievable using the drag and drop feature.

## Setup

## Future Developments

## Contact


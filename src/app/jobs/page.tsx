'use client'
import {
    Stack,
  } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { JobCard } from "@/../components/JobCard";
import { fetchAllJobs } from "@/app/api/utilities"

export default function JobsPage() {
    const [jobs, setJobs] = useState([]);

    const fetchJobs = async () => {
        const jobsData = await fetchAllJobs()
        console.log("jobsData: ", jobsData)
        setJobs(jobsData)
    }

    useEffect(() => {
        fetchJobs()
    }, [])

    return (
      <Stack direction='column'>
        {jobs ? jobs.map((job, index) => {
            return <JobCard key={parseInt(index)} name={job.name} description={job.description} />
        }) : null}
      </Stack>
    )
}
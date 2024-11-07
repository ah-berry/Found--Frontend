'use client'
import {
    Stack,
  } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { JobCard } from "@/../components/JobCard";
import { fetchAllJobs } from "@/app/api/utilities"

export default function ArchivePage() {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
      const jobsData = await fetchAllJobs()
      setJobs(jobsData)
  }

  useEffect(() => {
      fetchJobs()
  }, [])

  return (
      <Stack direction='column'>
        {jobs ? jobs.map((job, index) => {
            return job.is_archived == true && 
            <JobCard 
              key={parseInt(index)} 
              id={job.id}
              name={job.name} 
              description={job.description} 
              isArchived={job.is_archived}/>
        }) : null}
      </Stack>
  )
}
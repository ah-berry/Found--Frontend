'use client'
import {
    Stack,
  } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { JobCard } from "@/../components/JobCard";
import { fetchAllArchivedJobs } from "@/app/api/utilities"

export default function ArchivePage() {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
      const jobsData = await fetchAllArchivedJobs()
      setJobs(JSON.parse(jobsData))
  }

  useEffect(() => {
      fetchJobs()
  }, [])

  return (
      <Stack direction='column'>
        {jobs ? jobs.map((job, index) => {
            return <JobCard 
                        key={parseInt(index)} 
                        name={job.fields.name} 
                        description={job.fields.description} 
                        isArchived={true}/>
        }) : null}
      </Stack>
  )
}
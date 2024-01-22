'use client'

import React, { useEffect, useState } from 'react';
import AddUrlForm from '@/components/roles/addURL.form';
import UrlTable from '@/components/roles/url.table';
import { getCookie } from 'cookies-next';
import { Container } from '@mui/material';

interface ApiUrl {
  id: number;
  url: string;
  description: string;
  created_at: string;
  updated_at: string;
  groups: []
}

export default function Roles(props: any) {
  const [urls, setUrls] = useState<ApiUrl[]>([]);
  const access_token = getCookie('jwt')
  console.log(access_token)

  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/role/read`, {
        method: 'GET',
        headers: {
          'authorization': `Bearer ${access_token}`
        }
      });
      const data: ApiUrl[] = await res.json();
      setUrls(data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array ensures that this effect runs once when the component mounts

  return (
    <Container>
      <AddUrlForm handleRerende= {fetchData} />
      <UrlTable urls={urls} handleRerende= {fetchData}/>
    </Container>
  );
}

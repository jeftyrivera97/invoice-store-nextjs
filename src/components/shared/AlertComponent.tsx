import React from 'react'

export default async function AlertComponent({
  searchParams,
}: {
  searchParams: { page?: string; search?: string };
}) {
  await searchParams;

  
  return (
    <div>AlertComponent</div>
  )
}

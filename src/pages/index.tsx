import { useEffect, useState } from 'react';
import Link from 'next/link';
import MainCard from '../components/MainCard';
export default function Home() {
  return (
        <MainCard title="Advent of Code 2022">
            <ul className='puzzle-list'>
              <Link href="/dec1">
                <li>Dec 1. Calorie Counting.</li>
              </Link>

              <Link href="/dec2">
                <li>Day 2: Rock Paper Scissors.</li>
              </Link>
            </ul>
        </MainCard>
  )
}
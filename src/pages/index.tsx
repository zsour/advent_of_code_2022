import { useEffect, useState } from 'react';
import Link from 'next/link';
import MainCard from '../components/MainCard';
export default function Home() {
  return (
        <MainCard title="Advent of Code 2022">
            <ul className='puzzle-list'>
              <Link href="/dec1">
                <li>Dec 1: Calorie Counting.</li>
              </Link>

              <Link href="/dec2">
                <li>Day 2: Rock Paper Scissors.</li>
              </Link>

              <Link href="/dec3">
                <li>Day 3: Rucksack Reorganization.</li>
              </Link>

              <Link href="/dec4">
                <li>Day 4: Camp Cleanup.</li>
              </Link>

              <Link href="/dec5">
                <li>Day 5: ?</li>
              </Link>
            </ul>
        </MainCard>
  )
}
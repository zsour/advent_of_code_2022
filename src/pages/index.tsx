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
                <li>Day 5: Supply Stacks.</li>
              </Link>

              <Link href="/dec6">
                  <li>Day 6: Tuning Trouble.</li>
              </Link>

              <Link href="/dec7">
                <li>Day 7: No Space Left On Device.</li>
              </Link>

              <Link href="/dec8">
                <li>Day 8: Treetop Tree House.</li>
              </Link>

              <Link href="/dec9">
                <li>Day 9: Rope Bridge.</li>
              </Link>

              <Link href="/dec10">
                <li>Day 10: Cathode-Ray Tube.</li>              
              </Link>

              <Link href="/dec11">
                <li>Day 11: Monkey in the Middle.</li>              
              </Link>

              <Link href="/dec12">
                <li>Day 12: Hill Climbing Algorithm.</li>              
              </Link>
            </ul>
        </MainCard>
  )
}
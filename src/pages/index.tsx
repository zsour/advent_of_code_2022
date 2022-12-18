import { useEffect, useState } from 'react';
import Link from 'next/link';
import MainCard from '../components/MainCard';
export default function Home() {
  return (
        <MainCard title="Advent of Code 2022">
            <ul className='puzzle-list'>
              <Link href="/dec1">
                <li>✅Dec 1: Calorie Counting.</li>
              </Link>

              <Link href="/dec2">
                <li>✅Day 2: Rock Paper Scissors.</li>
              </Link>

              <Link href="/dec3">
                <li>✅Day 3: Rucksack Reorganization.</li>
              </Link>

              <Link href="/dec4">
                <li>✅Day 4: Camp Cleanup.</li>
              </Link>

              <Link href="/dec5">
                <li>✅Day 5: Supply Stacks.</li>
              </Link>

              <Link href="/dec6">
                  <li>✅Day 6: Tuning Trouble.</li>
              </Link>

              <Link href="/dec7">
                <li>✅Day 7: No Space Left On Device.</li>
              </Link>

              <Link href="/dec8">
                <li>✅Day 8: Treetop Tree House.</li>
              </Link>

              <Link href="/dec9">
                <li>✅Day 9: Rope Bridge.</li>
              </Link>

              <Link href="/dec10">
                <li>✅Day 10: Cathode-Ray Tube.</li>              
              </Link>

              <Link href="/dec11">
                <li>Day 11: Monkey in the Middle. (Part 2: Work in progress...)</li>              
              </Link>

              <Link href="/dec12">
                <li>Day 12: Hill Climbing Algorithm. (Work in progress...)</li>              
              </Link>

              <Link href="/dec13">
                <li>✅Day 13: Distress Signal.</li>              
              </Link>

              <Link href="/dec14">
                <li>Day 14: Regolith Reservoir. (Work in progress...)</li>              
              </Link>

              <Link href="/dec15">
                <li>Day 15: Beacon Exclusion Zone. (Work in progress...)</li>              
              </Link>

              <Link href="/dec16">
                <li>Day 16: Proboscidea Volcanium. (Work in progress...)</li>              
              </Link>

              <Link href="/dec17">
                <li>Day 17: Pyroclastic Flow. (Work in progress...)</li>              
              </Link>

              <Link href="/dec18">
                <li>Day 18: Boiling Boulders. (Work in progress...)</li>              
              </Link>
            </ul>
        </MainCard>
  )
}
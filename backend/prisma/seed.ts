import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const colleges = [
  {
    name: 'Delhi Technical University',
    location: 'Delhi',
    fees: 220000,
    rating: 4.5,
    overview: 'A public technical university known for engineering, research, and strong industry connections.',
    placements: 'Average package around 12 LPA with strong software and core engineering recruiters.',
    courses: ['B.Tech Computer Science', 'B.Tech Mechanical', 'MBA'],
  },
  {
    name: 'Mumbai Institute of Technology',
    location: 'Mumbai',
    fees: 180000,
    rating: 4.2,
    overview: 'Private engineering institute with modern labs and practical learning programs.',
    placements: 'Average package around 8 LPA with recruiters from IT, fintech, and consulting.',
    courses: ['B.Tech IT', 'B.Tech Electronics', 'M.Tech Data Science'],
  },
  {
    name: 'Bangalore College of Engineering',
    location: 'Bangalore',
    fees: 250000,
    rating: 4.6,
    overview: 'Technology-focused college located near major startup and enterprise technology hubs.',
    placements: 'Average package around 14 LPA with excellent internship conversion opportunities.',
    courses: ['B.Tech CSE', 'B.Tech AI and ML', 'MCA'],
  },
  {
    name: 'Pune Business and Technology College',
    location: 'Pune',
    fees: 160000,
    rating: 4.0,
    overview: 'Multidisciplinary college offering engineering and management programs.',
    placements: 'Average package around 7 LPA across IT services, product companies, and business roles.',
    courses: ['B.Tech Civil', 'BBA', 'MBA'],
  },
  {
    name: 'Chennai National Engineering College',
    location: 'Chennai',
    fees: 140000,
    rating: 4.1,
    overview: 'Established engineering college with a focus on academics, projects, and campus hiring.',
    placements: 'Average package around 6.5 LPA with consistent placement records.',
    courses: ['B.Tech ECE', 'B.Tech CSE', 'M.Tech VLSI'],
  },
];

async function main() {
  for (const college of colleges) {
    await prisma.college.upsert({
      where: { name: college.name },
      update: college,
      create: college,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

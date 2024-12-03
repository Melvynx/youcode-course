import { PrismaClient } from "@prisma/client";

import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const main = async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const users: Promise<any>[] = [];

  for (let i = 0; i < 10; i++) {
    const id = faker.string.uuid();
    users.push(
      prisma.user.create({
        data: {
          id,
          email: faker.internet.email(),
          createdAt: faker.date.past(),
          ownedCourses: {
            create: {
              course: {
                create: {
                  creatorId: id,
                  name: faker.lorem.words(3),
                  createdAt: faker.date.past(),
                  presentation: faker.lorem.paragraph(),
                  image: faker.image.url(),
                  lessons: {
                    createMany: {
                      data: [
                        {
                          name: faker.lorem.words(3),
                          content: faker.lorem.paragraph(),
                          rank: "aaaaaa",
                        },
                        {
                          name: faker.lorem.words(3),
                          content: faker.lorem.paragraph(),
                          rank: "aaaaab",
                        },
                      ],
                    },
                  },
                },
              },
            },
          },
        },
      })
    );
  }

  const finalUsers = await Promise.all(users);

  // link users to courses
  const courses = await prisma.course.findMany();

  for await (const course of courses) {
    const random3Users = faker.helpers.arrayElements(finalUsers, 3);

    for await (const user of random3Users) {
      try {
        await prisma.courseOnUser.create({
          data: {
            userId: user.id,
            courseId: course.id,
          },
        });
      } catch {
        // nothing
      }
    }
  }
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);

    await prisma.$disconnect();

    process.exit(1);
  });

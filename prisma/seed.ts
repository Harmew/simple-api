const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      name: "Daniel de Oliveira",
      email: "daniel.oliveira@liggavc.com.br",
      password: "$2b$10$dkLwJIxT9DFJ47q1cmliU.7twWmpftvKFl1rF0s1U70zjScDTsJCC",
      birthDate: new Date("2003-11-07"),
      sex: "Masculino",
    },
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const main = async () => {
  const constructTranslations = (en, fr) => {
    return {
      "en-GB": en || "",
      fr: fr || "",
    };
  };

  const ProjectCategories = {
    PHOTOGRAPHY: "Photography",
    FINE_ART: "Fine-art",
    CODING: "Coding",
  }

  const sampleData = `
  # Hello
  This is an example blog post
  ## With multiple levels of headings
  ### Even smaller ones
  Maybe you want to [link](https://www.google.com) to another site.
  
  > Block quotes are allowed too
  - As well as dash
  * and bullet point lists
  
  \`\`\`python
    def do_something():
      print('Function just does nothing')
  \`\`\`
  
  `;

  try {
    await prisma.user.deleteMany({});
    await prisma.blogImage.deleteMany({});
    await prisma.blogEntry.deleteMany({});
    await prisma.newsletterSubscriber.deleteMany({});
    await prisma.blogEntry.create({
      data: {
        title: constructTranslations("A"),
        shortDescription: constructTranslations("A short"),
        content: constructTranslations(sampleData),
        draft: false,
        archieved: false,
        category: [ProjectCategories.FINE_ART],
        date: new Date("2022-07-24"),
        images: {
          createMany: {
            data: [
              {
                imageUrl: "https://placekitten.com/500/300",
                altText: constructTranslations("A kitten 1"),
                height: 300,
                width: 500,
                isCover: false,
                title: constructTranslations("Image a"),
              },
              {
                imageUrl: "https://placekitten.com/500/300",
                altText: constructTranslations("A kitten 2"),
                height: 300,
                width: 500,
                isCover: true,
                title: constructTranslations("Image b"),
              },
              {
                imageUrl: "https://placekitten.com/500/300",
                altText: constructTranslations("A kitten 3"),
                height: 300,
                width: 500,
                isCover: false,
                title: constructTranslations("Image c"),
              },
              {
                imageUrl: "https://placekitten.com/500/300",
                altText: constructTranslations("A kitten 4"),
                height: 300,
                width: 500,
                isCover: false,
                title: constructTranslations("Image d"),
              },
            ],
          },
        },
      },
    });
    await prisma.blogEntry.createMany({
      data: [
        {
          title: constructTranslations("B"),
          shortDescription: constructTranslations("B short"),
          content: constructTranslations("B content"),
          draft: false,
          archieved: false,
          category: [ProjectCategories.PHOTOGRAPHY, ProjectCategories.FINE_ART],
          date: new Date("2022-06-23"),
        },
        {
          title: constructTranslations("C"),
          shortDescription: constructTranslations("C short"),
          content: constructTranslations("C content"),
          draft: true,
          archieved: false,
          category: [ProjectCategories.FINE_ART],
          date: new Date("2022-07-22"),
        },
        {
          title: constructTranslations("D"),
          shortDescription: constructTranslations("D short"),
          content: constructTranslations("D content"),
          draft: false,
          archieved: true,
          category: [ProjectCategories.FINE_ART],
          date: new Date("2022-07-21"),
        },
        {
          title: constructTranslations("E"),
          shortDescription: constructTranslations("E short"),
          content: constructTranslations("E content"),
          draft: false,
          archieved: false,
          date: new Date("2022-05-20"),
        },
        {
          title: constructTranslations("F"),
          shortDescription: constructTranslations("F short"),
          content: constructTranslations("F content"),
          draft: false,
          archieved: false,
          category: [ProjectCategories.FINE_ART],
          date: new Date("2022-04-20"),
        },
        {
          title: constructTranslations("G"),
          shortDescription: constructTranslations("G short"),
          content: constructTranslations("G content"),
          draft: false,
          archieved: false,
          category: [ProjectCategories.CODING],
          date: new Date("2022-03-20"),
        },
        {
          title: constructTranslations("H"),
          shortDescription: constructTranslations("H short"),
          content: constructTranslations("H content"),
          draft: false,
          archieved: false,
          category: [ProjectCategories.FINE_ART, ProjectCategories.CODING],
          date: new Date("2022-02-20"),
        },
        {
          title: constructTranslations("I"),
          shortDescription: constructTranslations("I short"),
          content: constructTranslations("I content"),
          draft: false,
          archieved: false,
          category: [ProjectCategories.FINE_ART, ProjectCategories.PHOTOGRAPHY],
          date: new Date("2022-01-20"),
        },
        {
          title: constructTranslations("J"),
          shortDescription: constructTranslations("J short"),
          content: constructTranslations("J content"),
          draft: false,
          archieved: false,
          category: [ProjectCategories.PHOTOGRAPHY, ProjectCategories.CODING],
          date: new Date("2021-12-20"),
        },
      ],
    });
    await prisma.user.createMany({
      data: [
        {
          id: '1',
          isAdmin: true,
          name: 'Adam Admin',
          email: 'adam@admin.invalid',
          emailVerified: new Date('2022-07-25'),
          image: null,
        },
        {
          id: '2',
          isAdmin: false,
          name: 'Ursula User',
          email: 'ursula@user.invalid',
          emailVerified: new Date('2022-07-25'),
          image: null,
        }
      ]
    })
    await prisma.newsletterSubscriber.createMany({
      data: [
        {
          email: 'verified@email.invalid',
          emailVerified: true
        },
        {
          email: 'unverified@email.invalid',
          emailVerified: false
        }
      ]
    })
  } catch (e) {
    console.log(e); // eslint-disable-line no-console
    process.exit(1);
  } finally {
    prisma.$disconnect();
  }
};

main();

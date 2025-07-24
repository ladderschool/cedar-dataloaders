import { db } from 'api/src/lib/db'

// Manually apply seeds via the `yarn rw prisma db seed` command.
//
// Seeds automatically run the first time you run the `yarn rw prisma migrate dev`
// command and every time you run the `yarn rw prisma migrate reset` command.
//
// See https://redwoodjs.com/docs/database-seeds for more info

export default async () => {
  try {
    // Seed Books
    const books = [
      {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        year: 1925,
        genre: 'Fiction',
        description:
          'A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.',
      },
      {
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        year: 1960,
        genre: 'Fiction',
        description:
          'The story of young Scout Finch and her father Atticus in a racially divided Alabama town.',
      },
      {
        title: '1984',
        author: 'George Orwell',
        year: 1949,
        genre: 'Dystopian',
        description:
          'A dystopian novel about totalitarianism and surveillance society.',
      },
      {
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        year: 1813,
        genre: 'Romance',
        description:
          'The story of Elizabeth Bennet and Mr. Darcy in early 19th century England.',
      },
      {
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        year: 1937,
        genre: 'Fantasy',
        description:
          'A fantasy novel about Bilbo Baggins and his journey with thirteen dwarves.',
      },
      {
        title: 'Dune',
        author: 'Frank Herbert',
        year: 1965,
        genre: 'Science Fiction',
        description:
          'A science fiction novel set on the desert planet Arrakis.',
      },
    ]

    // Seed Magazines
    const magazines = [
      {
        title: 'Tech Weekly',
        content: 'The latest in technology news and innovations.',
        published: true,
      },
      {
        title: 'Science Today',
        content: 'Breaking discoveries and research in the world of science.',
        published: true,
      },
      {
        title: 'Business Insights',
        content: 'Analysis and trends in the business world.',
        published: true,
      },
      {
        title: 'Health & Wellness',
        content: 'Tips and advice for maintaining a healthy lifestyle.',
        published: true,
      },
      {
        title: 'Creative Arts',
        content: 'Exploring the world of art, music, and creative expression.',
        published: false,
      },
    ]

    console.info('Checking for existing books...')
    const createdBooks = []

    for (const bookData of books) {
      // Check if book already exists by title
      const existingBook = await db.book.findFirst({
        where: { title: bookData.title },
      })

      if (existingBook) {
        console.info(`Book "${bookData.title}" already exists, skipping...`)
        createdBooks.push(existingBook)
      } else {
        console.info(`Creating book "${bookData.title}"...`)
        const newBook = await db.book.create({ data: bookData })
        createdBooks.push(newBook)
      }
    }

    console.info('Checking for existing magazines...')
    const createdMagazines = []

    for (const magazineData of magazines) {
      // Check if magazine already exists by title
      const existingMagazine = await db.magazine.findFirst({
        where: { title: magazineData.title },
      })

      if (existingMagazine) {
        console.info(
          `Magazine "${magazineData.title}" already exists, skipping...`
        )
        createdMagazines.push(existingMagazine)
      } else {
        console.info(`Creating magazine "${magazineData.title}"...`)
        const newMagazine = await db.magazine.create({ data: magazineData })
        createdMagazines.push(newMagazine)
      }
    }

    console.info('Seeding pages for each book...')

    // Lorem Ipsum paragraphs for generating content
    const loremParagraphs = [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
      'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
      'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.',
      'Vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.',
      'Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.',
      'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.',
      'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus.',
    ]

    // Create pages for each book
    for (const book of createdBooks) {
      // Check if pages already exist for this book
      const existingPages = await db.page.findMany({
        where: { bookId: book.id },
      })

      if (existingPages.length > 0) {
        console.info(`Pages already exist for "${book.title}", skipping...`)
        continue
      }

      const pages = []

      // Create 50+ pages for each book
      for (let i = 1; i <= 55; i++) {
        const pageTitle = `Chapter ${Math.ceil(i / 10)} - Page ${i}`
        const content =
          loremParagraphs[i % loremParagraphs.length] +
          ' ' +
          loremParagraphs[(i + 1) % loremParagraphs.length] +
          ' ' +
          loremParagraphs[(i + 2) % loremParagraphs.length]

        pages.push({
          title: pageTitle,
          content: content,
          slug: `${book.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-page-${i}`,
          published: i <= 50, // First 50 pages published, last 5 as drafts
          bookId: book.id,
        })
      }

      await db.page.createMany({ data: pages })
      console.info(`Created ${pages.length} pages for "${book.title}"`)
    }

    console.info('Seeding magazine pages...')

    // Create magazine pages for each magazine
    for (const magazine of createdMagazines) {
      // Check if magazine pages already exist for this magazine
      const existingMagazinePages = await db.magazinePage.findMany({
        where: { magazineId: magazine.id },
      })

      if (existingMagazinePages.length > 0) {
        console.info(
          `Magazine pages already exist for "${magazine.title}", skipping...`
        )
        continue
      }

      const magazinePages = []

      // Create 20+ pages for each magazine
      for (let i = 1; i <= 25; i++) {
        const pageTitle = `Article ${i} - ${magazine.title}`
        const content =
          loremParagraphs[i % loremParagraphs.length] +
          ' ' +
          loremParagraphs[(i + 1) % loremParagraphs.length] +
          ' ' +
          loremParagraphs[(i + 2) % loremParagraphs.length]

        magazinePages.push({
          title: pageTitle,
          content: content,
          published: i <= 20, // First 20 pages published, last 5 as drafts
          magazineId: magazine.id,
        })
      }

      await db.magazinePage.createMany({ data: magazinePages })
      console.info(
        `Created ${magazinePages.length} pages for "${magazine.title}"`
      )
    }

    console.info('Database seeded successfully!')
  } catch (error) {
    console.error('Error seeding database:', error)
  }
}

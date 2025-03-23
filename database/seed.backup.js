import { fakerEN_US as faker } from '@faker-js/faker'
import { createClient } from '@supabase/supabase-js'
import slugify from 'slugify'

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

// const person = faker.person

// console.log(`${person.lastName()}${person.firstName()}`)
// console.log(`${person.fullName()}`)
// console.log(person.bio())

const seedProjects = async (numEntires = 1) => {
  const projects = Array.from({ length: numEntires }, () => {
    const projectName = `Project ${faker.lorem.words(3)}`
    return {
      name: projectName,
      slug: slugify(projectName, { lower: true }),
      status: faker.helpers.arrayElement(['in-progress', 'completed']),
      collaborators: faker.helpers.arrayElements([1, 2, 3, 4, 5]),
    }
  })

  const { data, error, status } = await supabase.from('projects').insert(projects).select()

  console.log({
    data,
    error,
    status,
  })
}

seedProjects(5)

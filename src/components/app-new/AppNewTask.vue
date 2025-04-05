<script setup lang="ts">
import { insertTaskQuery, profilesQuery, projectsQuery } from '@/lib/supabaseQueries'
import type { CreateNewTaskForm } from '@/types/CreateForm'

const sheetOpen = defineModel<boolean>()

type SelectOption = {
  label: string
  value: string | number
}

const selectOptions: Ref<{
  projects: SelectOption[]
  profiles: SelectOption[]
}> = ref({
  projects: [],
  profiles: [],
})

const fetchProjectOptions = async () => {
  const { data } = await projectsQuery()

  if (data) {
    selectOptions.value.projects = data.map((project) => ({
      label: project.name,
      value: project.id,
    }))
  }
}

const fetchProfileOptions = async () => {
  const { data } = await profilesQuery()

  if (data) {
    selectOptions.value.profiles = data.map((profile) => ({
      label: `${profile.first_name} ${profile.last_name} (${profile.username})`,
      value: profile.id,
    }))
  }
}

const createTask = async (formData: CreateNewTaskForm) => {
  await new Promise((r) => setTimeout(r, 1000))

  await insertTaskQuery({
    name: formData.name,
    status: 'in-progress',
    description: formData.description,
    due_date: formData.due_date,
    project_id: formData.project_id,
    collaborators: [formData.profile_id],
  })

  sheetOpen.value = false
}

;(async () => {
  await Promise.all([fetchProjectOptions(), fetchProfileOptions()])
})()
</script>

<template>
  <Sheet v-model:open="sheetOpen">
    <SheetContent>
      <SheetHeader>
        <SheetTitle>New Task</SheetTitle>
      </SheetHeader>

      <div class="mr-4 ml-4">
        <FormKit
          type="form"
          @submit="createTask"
          submit-label="Create Task"
          :config="{ validationVisibility: 'submit' }"
        >
          <FormKit
            type="text"
            label="Name"
            name="name"
            id="name"
            placeholder="My new task"
            validation="required|length:3,50"
          />

          <FormKit
            type="select"
            label="For"
            name="profile_id"
            id="for"
            placeholder="Select a user"
            :options="selectOptions.profiles"
            validation="required"
          />

          <FormKit
            type="textarea"
            label="Description"
            name="description"
            id="description"
            placeholder="Task description"
            validation="length:0,100"
          />

          <FormKit
            type="select"
            label="Project"
            name="project_id"
            id="project"
            placeholder="Select a project"
            :options="selectOptions.projects"
            validation="required"
          />

          <FormKit type="date" label="Due date" name="due_date" id="due_date" />
        </FormKit>
      </div>

      <SheetFooter>
        <SheetClose>Close</SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>

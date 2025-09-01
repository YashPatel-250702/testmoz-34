import prisma from "@/lib/shared/Common/PrismaClient";

export async function saveFormRepo(mentorId: string, formData: { title: string; fields: any }) {
  const result = await prisma.form.create({
    data: {
      title: formData.title,
      fields: formData.fields,
      mentorId: mentorId,
    },
  });
  return result;
}

export async function updateFormRepo(formId: string, formData: { title: string; fields: any }) {
  const result = await prisma.form.update({
    where: { id: formId },
    data: {
      title: formData.title,
      fields: formData.fields,
    },
  });
  return result;
}

export async function getFormByIdRepo(formId: string) {
  return await prisma.form.findUnique({
    where: { id: formId },
  });
}

export async function getFormsByMentorRepo(mentorId: string) {
  return await prisma.form.findMany({
    where: { mentorId },
    orderBy: { createdAt: "desc" },
  });
}

export async function saveFormResponseRepo(formId: string, responses: any) {
  return await prisma.formResponse.create({
    data: {
      formId,
      responses,
    },
  });
}

export async function getFormResponsesByFormIdRepo(formId: string) {
  return await prisma.formResponse.findMany({
    where: { formId },
    orderBy: { createdAt: "desc" },
  });
}

export async function deleteFormRepo(formId: string) {
  await prisma.formResponse.deleteMany({
    where: { formId },
  });

  const result = await prisma.form.delete({
    where: { id: formId },
  });

  return result;
}



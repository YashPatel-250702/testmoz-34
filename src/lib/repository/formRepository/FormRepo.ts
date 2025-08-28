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

export async function getFormsByMentorRepo(mentorId: string) {
  return await prisma.form.findMany({
    where: { mentorId },
    orderBy: { createdAt: "desc" },
  });
}

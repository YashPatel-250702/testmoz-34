import { saveFormRepo, updateFormRepo, getFormsByMentorRepo  } from "@/lib/repository/formRepository/FormRepo";
import { CommonErrorHandler } from "@/lib/shared/Common/CommonError";

export async function saveForm(mentorId: string, formData: { title: string; fields: any }) {
  const result = await saveFormRepo(mentorId, formData);
  if (!result) {
    throw new CommonErrorHandler("Failed to save the form", 500);
  }
  return result;
}

export async function updateForm(formId: string, formData: { title: string; fields: any }) {
  const result = await updateFormRepo(formId, formData);
  if (!result) {
    throw new CommonErrorHandler("Failed to update the form", 500);
  }
  return result;
}

export async function getFormsByMentorService(mentorId: string) {
  if (!mentorId) {
    throw new CommonErrorHandler("Mentor ID is required", 400);
  }
  const forms = await getFormsByMentorRepo(mentorId);
  return forms;
}
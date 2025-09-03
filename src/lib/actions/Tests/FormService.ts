import { saveFormRepo, updateFormRepo, getFormsByMentorRepo, getFormByIdRepo, saveFormResponseRepo, getFormResponsesByFormIdRepo, deleteFormRepo } from "@/lib/repository/formRepository/FormRepo";
import { CommonErrorHandler } from "@/lib/shared/Common/CommonError";

export async function saveForm(mentorId: string, formData: { title: string; fields: any }) {
  const result = await saveFormRepo(mentorId, formData);
  if (!result) {
    throw new CommonErrorHandler("Failed to save the form", 500);
  }
  return result;
}

export async function saveFormResponse(formId: string, data: any) {
  if (!formId) throw new CommonErrorHandler("Form ID is required", 400);
  if (!data) throw new CommonErrorHandler("Responses are required", 400);

  const result = await saveFormResponseRepo(formId, data);
  if (!result) throw new CommonErrorHandler("Failed to save form response", 500);
  return result;
}

export async function getFormByIdService(formId: string) {
  if (!formId) throw new CommonErrorHandler("Form ID is required", 400);
  const form = await getFormByIdRepo(formId);
  if (!form) throw new CommonErrorHandler("Form not found", 404);
  return form;
}

export async function getFormResponsesByFormIdService(formId: string) {
  if (!formId) throw new CommonErrorHandler("Form ID is required", 400);
  const responses = await getFormResponsesByFormIdRepo(formId);
  return responses;
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

export async function deleteForm(formId: string) {
  const result = await deleteFormRepo(formId);
  if (!result) {
    throw new CommonErrorHandler("Failed to delete the form", 500);
  }
  return result;
}
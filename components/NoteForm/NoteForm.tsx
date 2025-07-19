'use client';

import { useId, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import css from './NoteForm.module.css';

import { createNote } from '@/lib/api/clientApi';
import { useNoteDraftStore } from '@/lib/store/noteStore';

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, 'Please enter at least 3 characters')
    .max(50, 'Maximum 50 characters')
    .required("Title can't be empty"),
  content: Yup.string().max(500, 'Maximum 500 characters'),
  tag: Yup.string()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'], 'Invalid tag')
    .required('Tag is required'),
});

type FormValues = Yup.InferType<typeof validationSchema>;

export default function NoteForm() {
  const idPrefix = useId();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [isValid, setIsValid] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      clearDraft();
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      queryClient.invalidateQueries({ queryKey: ['tags'] });
      toast.success('Note created');
      router.push('/notes/filter/All');
    },
    onError: () => {
      toast.error('Failed to create note. Try again.');
    },
  });

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const newDraft = { ...draft, [name]: value };
    setDraft(newDraft);

    try {
      const fieldSchema = Yup.reach(validationSchema, name) as Yup.AnySchema;
await fieldSchema.validate(value);
setErrors((prev) => ({ ...prev, [name]: '' }));

const fullValid = await validationSchema.isValid(newDraft);
setIsValid(fullValid);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        setErrors((prev) => ({ ...prev, [name]: err.message }));
        setIsValid(false);
      }
    }
  };

  const handleSubmit = async (formData: FormData) => {
  setIsSubmitting(true);
  const values = Object.fromEntries(formData) as FormValues;

  try {
    const validated = await validationSchema.validate(values, { abortEarly: false });
    setIsValid(true);

    mutation.mutate({
      title: validated.title,
      content: validated.content ?? '',
      tag: validated.tag,
    });
  } catch (err) {
    if (err instanceof Yup.ValidationError) {
      const newErrors: Partial<Record<keyof FormValues, string>> = {};
      err.inner.forEach((e) => {
        if (e.path && !newErrors[e.path as keyof FormValues]) {
          newErrors[e.path as keyof FormValues] = e.message;
        }
      });
      setErrors(newErrors);
      setIsValid(false);
    }
  } finally {
    setIsSubmitting(false);
  }
};

  const handleCancel = () => {
    router.push('/notes/filter/All');
  };

  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor={`${idPrefix}-title`}>Title</label>
        <input
          id={`${idPrefix}-title`}
          name="title"
          className={css.input}
          defaultValue={draft.title}
          onChange={handleChange}
        />
        {errors.title && <span className={css.error}>{errors.title}</span>}
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${idPrefix}-content`}>Content</label>
        <textarea
          id={`${idPrefix}-content`}
          name="content"
          rows={8}
          className={css.textarea}
          defaultValue={draft.content}
          onChange={handleChange}
        />
        {errors.content && <span className={css.error}>{errors.content}</span>}
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${idPrefix}-tag`}>Tag</label>
        <select
          id={`${idPrefix}-tag`}
          name="tag"
          className={css.select}
          defaultValue={draft.tag}
          onChange={handleChange}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
        {errors.tag && <span className={css.error}>{errors.tag}</span>}
      </div>

      <div className={css.actions}>
        <button type="button" className={css.cancelButton} onClick={handleCancel}>
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={!isValid || isSubmitting}
        >
          Create note
        </button>
      </div>
    </form>
  );
}

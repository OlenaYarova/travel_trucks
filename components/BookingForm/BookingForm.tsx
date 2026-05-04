'use client';

import { useEffect, useState } from 'react';

import { createBooking } from '@/lib/api/clientApi';
import type { BookingPayload } from '@/types/camper';

import styles from './BookingForm.module.css';

type BookingFormProps = {
  camperName: string;
};

const initialState: BookingPayload = {
  name: '',
  email: '',
};

export function BookingForm({ camperName }: BookingFormProps) {
  const [formState, setFormState] = useState<BookingPayload>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setToast(null);
    }, 4000);

    return () => window.clearTimeout(timeoutId);
  }, [toast]);

  const updateField = (field: keyof BookingPayload, value: string) => {
    setFormState((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    try {
      await createBooking(formState);
      const successMessage = `Booking request for ${camperName} was sent successfully.`;

      setFeedback({
        type: 'success',
        message: successMessage,
      });
      setToast({
        type: 'success',
        message: successMessage,
      });
      setFormState(initialState);
    } catch (error) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : 'Failed to send booking request. Please try again.';

      const errorMessage =
        message.includes('404') || message.includes('Cannot POST /bookings')
          ? 'The current backend does not provide a booking endpoint yet. The form UI is ready, but submission is unavailable in this API version.'
          : 'Failed to send booking request. Please try again.';

      setFeedback({
        type: 'error',
        message: errorMessage,
      });
      setToast({
        type: 'error',
        message: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.card}>
      {toast && (
        <div
          className={`${styles.toast} ${
            toast.type === 'success' ? styles.toastSuccess : styles.toastError
          }`}
          role="status"
          aria-live="polite"
        >
          <span className={styles.toastTitle}>
            {toast.type === 'success' ? 'Success' : 'Error'}
          </span>
          <span>{toast.message}</span>
        </div>
      )}

      <h2 className={styles.title}>Book your campervan now</h2>
      <p className={styles.text}>
        Stay connected. We are always ready to help you with your trip planning.
      </p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          placeholder="Name*"
          value={formState.name}
          onChange={(event) => updateField('name', event.target.value)}
          required
        />

        <input
          className={styles.input}
          type="email"
          placeholder="Email*"
          value={formState.email}
          onChange={(event) => updateField('email', event.target.value)}
          required
        />

        <button className={styles.button} type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send'}
        </button>
      </form>

      {feedback && (
        <p
          className={
            feedback.type === 'success' ? styles.successMessage : styles.errorMessage
          }
        >
          {feedback.message}
        </p>
      )}
    </section>
  );
}

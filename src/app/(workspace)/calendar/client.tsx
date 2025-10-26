"use client";

import CalendarHeader from "@/components/Workspace/Calendar/CalendarHeader";
import Calendar from "@/components/Workspace/Calendar/Calendar";
import UpcomingEvents from "@/components/Workspace/Calendar/UpcomingEvents";
import { CalendarEvent, Exam } from "@/types";
import { useState } from "react";

export default function CalendarClient({ exams }: { exams: Exam[] }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);

  const openModal = (ev?: CalendarEvent) => {
    setEditingEvent(ev ?? null);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-neutral-950">
      <CalendarHeader onAdd={() => openModal()} />
      <div className="flex flex-row gap-4 p-4">
        <Calendar
          exams={exams}
          modalOpen={modalOpen}
          openModal={openModal}
          closeModal={closeModal}
          editingEvent={editingEvent}
        />
        <UpcomingEvents exams={exams} />
      </div>
    </div>
  );
}

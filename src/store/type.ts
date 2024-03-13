interface Slot {
  start: string | null;
  end: string | null;
}

interface Schedule {
  date: string;
  slots: Slot[];
}

interface Match {
  id: string;
  title: string;
  teamA: string;
  teamB: string;
  schedules: Schedule[];
}

export default Match;

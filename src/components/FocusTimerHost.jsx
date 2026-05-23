import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoriesAsync } from '../redux/slices/categoriesSlice';
import {
  addSessionAsync,
  fetchSessionsAsync,
} from '../redux/slices/sessionsSlice';
import {
  clearFocus,
  selectActiveFocus,
  tickFocus,
} from '../redux/slices/focusSlice';

const buildSessionPayload = (focus, status, secondsLeft) => ({
  category_id: focus.category.id,
  planned_duration_min: focus.plannedDurationMin,
  focused_seconds: Math.max(
    focus.plannedDurationMin * 60 - secondsLeft,
    0,
  ),
  status,
  started_at: focus.startedAt,
  ended_at: new Date().toISOString(),
});

export const createFocusSessionPayload = buildSessionPayload;

export default function FocusTimerHost() {
  const dispatch = useDispatch();
  const focus = useSelector(selectActiveFocus);
  const focusRef = useRef(focus);

  useEffect(() => {
    focusRef.current = focus;
  }, [focus]);

  useEffect(() => {
    if (!focus.category || !focus.isRunning) {
      return undefined;
    }

    const timerId = setInterval(() => {
      const currentFocus = focusRef.current;

      if (!currentFocus.category || !currentFocus.isRunning) {
        return;
      }

      if (currentFocus.remainingSeconds <= 1) {
        const payload = buildSessionPayload(currentFocus, 'completed', 0);

        dispatch(clearFocus());
        dispatch(addSessionAsync(payload))
          .unwrap()
          .then(() => {
            dispatch(fetchCategoriesAsync());
            dispatch(fetchSessionsAsync());
          })
          .catch(() => {});
        return;
      }

      dispatch(tickFocus());
    }, 1000);

    return () => clearInterval(timerId);
  }, [dispatch, focus.category, focus.isRunning]);

  return null;
}

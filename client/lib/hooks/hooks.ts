import { useDispatch, useSelector, useStore } from 'react-redux'
import type { AppDispatch, AppStore, RootState } from '../store'
import { Track } from "@/lib/defenitions";
import { useCallback, useEffect, useRef } from "react";
import { addToQueue, setQueue } from "@/lib/redux/playerSlice";
import { AsyncThunk } from "@reduxjs/toolkit";
import { selectCurrentUser, selectUserError, selectIsAuthenticated, selectUserLoading } from "@/lib/redux/userReducer/userSelectors";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()

export const useUpdateQueue = (tracks: Track[]) => {
  const dispatch = useAppDispatch();
  const queue = useAppSelector(state => state.player.queue)

  const updateQueue = useCallback(() => {
    if (tracks.length > 0) {
      if (queue.length > 0) {
        dispatch(addToQueue(tracks));
      } else {
        dispatch(setQueue(tracks));
      }
    }
  }, [dispatch, queue, tracks]);

  useEffect(() => {
    updateQueue();
  }, [updateQueue]);
};

export function useEntityLoader(
  value: string,
  actions: AsyncThunk<any, string, {}>[]
) {
  const dispatch = useAppDispatch();
  const actionsRef = useRef(actions);

  // Prevent creation of new function on actions change
  const loadData = useCallback(async() => {
    try {
      await Promise.all(
        actionsRef.current.map(action => dispatch(action(value)))
      );
    } catch (error) {
      console.error(error);
    }
  }, [dispatch, value]);

  useEffect(() => {
    loadData();
    // Clear on umount
    return () => {};
  }, [loadData]);
}

export const useAuthState = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = useSelector(selectUserLoading);
  const error = useSelector(selectUserError);

  return {
    user: currentUser,
    isAuthenticated,
    isLoading,
    error
  };
};
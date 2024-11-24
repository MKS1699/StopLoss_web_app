/* Index file for all the custom hooks used in the app for
 * importing and exporting.
 *
 * */

import { useAppDispatch, useAppSelector } from "./storeHooks";
import useTheme from "./useTheme";
import useGuestMode from "./useGuestMode";
import usePostValidation from "./usePostValidation";
import useHeader from "./useHeader";
import useGetPostsByUser from "./apiHooks/useGetPostsByUser";
import useDeletePostById from "./apiHooks/useDeletePostById";
import useRememberMe from "./useRememberMe";
import useIPOCardValidation from "./useIPOCardValidation";
export {
  useAppDispatch,
  useAppSelector,
  useTheme,
  useGuestMode,
  usePostValidation,
  useHeader,
  useGetPostsByUser,
  useDeletePostById,
  useRememberMe,
  useIPOCardValidation,
};


import * as React from "react"

// Fix: Changed TypeScript type import to JSDoc comment type definitions
/**
 * @typedef {import("@/components/ui/toast").ToastActionElement} ToastActionElement
 * @typedef {import("@/components/ui/toast").ToastProps} ToastProps
 */

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

/**
 * @typedef {ToastProps & {
 *   id: string
 *   title?: React.ReactNode
 *   description?: React.ReactNode
 *   action?: ToastActionElement
 * }} ToasterToast
 */

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} 

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

/**
 * @typedef {typeof actionTypes} ActionType
 */

/**
 * @typedef {| {
 *      type: ActionType["ADD_TOAST"]
 *      toast: ToasterToast
 *    }
 *    | {
 *      type: ActionType["UPDATE_TOAST"]
 *      toast: Partial<ToasterToast>
 *    }
 *    | {
 *      type: ActionType["DISMISS_TOAST"]
 *      toastId?: ToasterToast["id"]
 *    }
 *    | {
 *      type: ActionType["REMOVE_TOAST"]
 *      toastId?: ToasterToast["id"]
 *    }
 * } Action
 */

/**
 * @typedef {{ toasts: ToasterToast[] }} State
 */

const toastTimeouts = new Map()

/**
 * @param {string} toastId
 */
const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

/**
 * @param {State} state
 * @param {Action} action
 * @returns {State}
 */
export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

/** @type {Array<(state: State) => void>} */
const listeners = []

/** @type {State} */
let memoryState = { toasts: [] }

/**
 * @param {Action} action
 */
function dispatch(action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

/**
 * @typedef {Omit<ToasterToast, "id">} Toast
 */

/**
 * @param {Toast} props
 */
function toast(props) {
  const id = genId()

  /**
   * @param {ToasterToast} props
   */
  const update = (props) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

function useToast() {
  const [state, setState] = React.useState(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

export { useToast, toast }

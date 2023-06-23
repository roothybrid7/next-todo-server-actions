'use client';

import { useTransition } from 'react'
// Server action
import { updateDone } from "./actions";


type Props = {
    id: number;
    done: boolean;
};

export default function DoneCheckbox(props: Props) {
      let [isPending, startTransition] = useTransition()

    return (
        <input className='w-4 h-4' type="checkbox" disabled={isPending} defaultChecked={props.done} onChange={(e) => startTransition(async () => {
            await updateDone(props.id, e.target.checked);
        })} />
    )
}
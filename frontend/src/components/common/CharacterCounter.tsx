interface CharacterCounterProps {
    currentNr : number;
    maxNr : number;
}

export default function CharacterCounter({ currentNr, maxNr}: CharacterCounterProps) {
    return (
        <p className='text-xs font-extralight flex justify-end'>
            { currentNr } / { maxNr }
        </p>
    )
}
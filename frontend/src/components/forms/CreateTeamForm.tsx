import {useNavigate, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {createTeamSchema, CreateTeamValues} from "@/schemas/createTeamSchema.ts";
import {ClubMember} from "@/types/clubMember.ts";
import {teamService} from "@/services/teamService.ts";

export function CreateTeamForm() {
    const { clubId } = useParams<{ clubId: string }>();
    const navigate = useNavigate();
    const [ error, setError ] = useState<string | null>(null);
    const [ members, setMembers ] = useState<ClubMember[]>([])

    const form = useForm<CreateTeamValues>({
        resolver: zodResolver(createTeamSchema),
        defaultValues: {
            teamName: '',
            gameId: '',
            description: '',
            admissionType: 'open',
            becomeCaptain: true,
            captainId: '',
        },
    });

    async function handleSubmit(data: CreateTeamValues) {
        try {
            const requestData = {
                name: data.teamName,
                gameId: data.gameId,
                description: data.description,
                admissionType: data.admissionType,
                becomeCaptain: data.becomeCaptain,
                captainId: data.captainId,
            };

            const response = await teamService.createTeam(requestData, clubId);

            if(response) {
                navigate(`/team/${response.id}`, {replace: true});
            }
        } catch (error) {
            setError(error.message);
        }
    }

    const handleCancel= () => {

    };
}
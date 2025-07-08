import Link from 'next/link';
import { Button } from '../ui/button';

interface ButtonType {
    route: string;
    name: string;
    submissionType: 'submit' | 'reset' | undefined;
    disabled: boolean;
}

const LinkBtn = ({ route, name, submissionType, disabled = false }: ButtonType) => {
    return (
        <Link href={`${route}`}>
            <Button type={submissionType} disabled={disabled}>
                {name}
            </Button>
        </Link>
    );
};

export default LinkBtn;

import Link from 'next/link';

interface LogoType {
    logoColor: string;
}

const Logo = ({ logoColor }: LogoType) => {
    return (
        <div className={`cursor-pointer font-semibold text-2xl ${logoColor}`}>
            <Link href={'/'}>Win Daily🏆</Link>
        </div>
    );
};

export default Logo;

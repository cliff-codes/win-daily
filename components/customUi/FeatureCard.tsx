import LinkBtn from '../utility/LinkBtn';

interface CardType {
    icon: string;
    cardTitle: string;
    cardDescripiton: string;
    route: string;
}

const FeatureCard = ({ icon, cardTitle, cardDescripiton, route }: CardType) => {
    return (
        <div className='min-h-20 border bg-slate-50 rounded-md py-5 px-4 flex flex-col justify-between gap-2'>
            <div className='flex place-items-center font-medium gap-3'>
                <div className='text-3xl'>{icon}</div>
                <div className='text-lg'>{cardTitle}</div>
            </div>
            <div className='px-1 pt-2 text-sm'>{cardDescripiton}</div>
            <div className='flex justify-end'>
                <LinkBtn name={'try out'} route={route} />
            </div>
        </div>
    );
};

export default FeatureCard;

import React from 'react';
import FeatureCard from './FeatureCard';

const Features = () => {
    const allCardsInfo = [
        {
            icon: '🔥',
            cardTitle: 'Streak',
            cardDescription:
                'Set-up a number of days productivity challenge for yourself and get rewarded for all your consistency and wins',
            route: '/streak',
        },
        {
            icon: '🤼',
            cardTitle: 'Compete other like minded people',
            cardDescription:
                'Join group productivity hacks and challenges to help boost your moral to not give up',
            route: '/community',
        },
        {
            icon: '♻',
            cardTitle: 'Habit change contests',
            cardDescription:
                'Compete with friends or join a community challenge to gamify your habit building. Stay motivated and celebrate milestones together!',
            route: '/habits-change',
        },
    ];

    return (
        <section className='w-full max-w-7xl px-3 pb-16'>
            <h1 className='text-2xl font-medium text-center leading-relaxed underline'>
                Try out these Features👌
            </h1>

            <div className='w-full mt-8 flex flex-col gap-4 md:flex-row'>
                {allCardsInfo.map((cardData, index) => (
                    <FeatureCard
                        key={index}
                        icon={cardData.icon}
                        cardTitle={cardData.cardTitle}
                        cardDescripiton={cardData.cardDescription}
                        route={cardData.route}
                    />
                ))}
            </div>
        </section>
    );
};

export default Features;

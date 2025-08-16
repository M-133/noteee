import { useState } from 'react';
import { AuthForm } from '@/components/auth-form';
import { useGoals } from '@/hooks/use-goals';
import { useAuth } from '@/hooks/use-auth';
import { Header } from '@/components/header';
import { StatsSection } from '@/components/stats/stats-section';
import { GoalsGrid } from '@/components/goals/goals-grid';
import { WorkoutSection } from '@/components/workout/workout-section';
import { calculateGoalStats, filterGoals } from '@/utils/goal-utils';

function App() {
  const { isAuthenticated, login, logout } = useAuth();
  const {
    goals,
    addGoal,
    editGoal,
    addMilestone,
    toggleMilestone,
    toggleGoal,
    deleteGoal,
    deleteMilestone,
  } = useGoals();

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [isWorkoutOpen, setIsWorkoutOpen] = useState(false);

  if (!isAuthenticated) {
    return <AuthForm onLogin={login} />;
  }

  const { completedGoals, totalMilestones, completedMilestones, averageCompletion } =
    calculateGoalStats(goals);

  const filteredGoals = filterGoals(goals, filter, search);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[62rem] space-y-6 p-4 sm:p-6 md:space-y-8 md:p-8">
        <Header
          completedGoals={completedGoals}
          totalGoals={goals.length}
          completedMilestones={completedMilestones}
          totalMilestones={totalMilestones}
          isStatsOpen={isStatsOpen}
          setIsStatsOpen={setIsStatsOpen}
          isWorkoutOpen={isWorkoutOpen}
          setIsWorkoutOpen={setIsWorkoutOpen}
          onLogout={logout}
          onAddGoal={addGoal}
        />

        {isStatsOpen && (
          <StatsSection
            goals={goals}
            totalGoals={goals.length}
            completedGoals={completedGoals}
            totalMilestones={totalMilestones}
            completedMilestones={completedMilestones}
            averageCompletion={averageCompletion}
            search={search}
            setSearch={setSearch}
            filter={filter}
            setFilter={setFilter}
          />
        )}

        {isWorkoutOpen ? (
          <WorkoutSection />
        ) : (
          <GoalsGrid
            goals={goals}
            filteredGoals={filteredGoals}
            onAddGoal={addGoal}
            onAddMilestone={addMilestone}
            onToggleMilestone={toggleMilestone}
            onToggleGoal={toggleGoal}
            onDeleteGoal={deleteGoal}
            onDeleteMilestone={deleteMilestone}
            onEditGoal={editGoal}
          />
        )}
      </div>
    </div>
  );
}

export default App;
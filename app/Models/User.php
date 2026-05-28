<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\Contracts\PasskeyUser;
use Laravel\Fortify\PasskeyAuthenticatable;
use Laravel\Fortify\TwoFactorAuthenticatable;

#[Fillable(['name', 'email', 'password', 'role', 'status', 'phone', 'avatar_path'])]
#[Hidden(['password', 'two_factor_secret', 'two_factor_recovery_codes', 'remember_token'])]
class User extends Authenticatable implements PasskeyUser
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, PasskeyAuthenticatable, SoftDeletes, TwoFactorAuthenticatable;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
        ];
    }

    public function createdCsrPrograms(): HasMany
    {
        return $this->hasMany(CsrProgram::class, 'created_by');
    }

    public function createdTourismVillages(): HasMany
    {
        return $this->hasMany(TourismVillage::class, 'created_by');
    }

    public function assignedVillages(): BelongsToMany
    {
        return $this->belongsToMany(TourismVillage::class, 'village_enumerator_assignments', 'enumerator_id', 'village_id')
            ->withPivot(['assigned_by', 'is_active', 'assigned_at'])
            ->withTimestamps();
    }

    public function villageEnumeratorAssignments(): HasMany
    {
        return $this->hasMany(VillageEnumeratorAssignment::class, 'enumerator_id');
    }

    public function assignedVillageEnumeratorAssignments(): HasMany
    {
        return $this->hasMany(VillageEnumeratorAssignment::class, 'assigned_by');
    }

    public function createdSurveyTemplates(): HasMany
    {
        return $this->hasMany(SurveyTemplate::class, 'created_by');
    }

    public function assignedSurveyAssignments(): HasMany
    {
        return $this->hasMany(VillageSurveyAssignment::class, 'assigned_by');
    }

    public function submittedSurveyAssignments(): HasMany
    {
        return $this->hasMany(VillageSurveyAssignment::class, 'submitted_by');
    }

    public function reviewedSurveyAssignments(): HasMany
    {
        return $this->hasMany(VillageSurveyAssignment::class, 'reviewed_by');
    }

    public function surveyAnswers(): HasMany
    {
        return $this->hasMany(SurveyAnswer::class, 'answered_by');
    }

    public function editedSurveyAnswers(): HasMany
    {
        return $this->hasMany(SurveyAnswer::class, 'last_edited_by');
    }

    public function surveyAssignmentLogs(): HasMany
    {
        return $this->hasMany(VillageSurveyAssignmentLog::class, 'actor_id');
    }

    public function surveyAnswerHistories(): HasMany
    {
        return $this->hasMany(SurveyAnswerHistory::class, 'actor_id');
    }
}

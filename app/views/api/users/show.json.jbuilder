json.user do
    json.set! @user.id do 
        json.extract! @user, :id, :first_name, :last_name, :about, :location
    end
end

json.experience do
    @user.experiences.each do |experience|
        json.set! experience.id do
            json.extract! experience, :id, :title, :company, :location, :description, :start_month, :start_year, :end_month, :end_year, :skills, :logo 
        end
    end
end

json.education do
    @user.educations.each do |education|
        json.set! education.id do
            json.extract! education, :id, :user_id, :school, :degree, :start_month, :start_year, :end_month, :end_year
        end
    end
end

json.connection do
    @user.connected_users.each do |user|
        json.set! user.id do
            json.extract! user, :id, :first_name, :last_name, :location
        end
    end
end
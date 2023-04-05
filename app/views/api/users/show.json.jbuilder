json.user do
    json.set! @user.id do 
        json.extract! @user, :id, :first_name, :last_name, :about, :location
    end
end

json.experience do
    @user.experiences.each do |experience|
        json.set! experience.id do
            json.extract! experience, :id, :title, :company, :location, :description, :start_month, :start_year, :end_month, :end_year 
        end
    end
end
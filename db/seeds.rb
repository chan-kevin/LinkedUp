require "open-uri"
# ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    User.destroy_all
    Experience.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('experiences')
  
    puts "Creating users..."
    puts "Creating experiences..."
    # Create one user with an easy to remember username, email, and password:
    User.create!(
      phone_number: '+123456789', 
      email: 'demo@user.io', 
      first_name: 'Demo',
      last_name: 'User',
      headline: 'full stack developer looking for opportunity',
      password: 'password',
      about: "A full-stack developer with a passion for coding and an eagerness to take on new challenges. 
      While I don't have any professional experience as a developer, 
      I have acquired extensive knowledge of React, Redux, JavaScript, CSS, HTML, Ruby, and Canvas 
      through app academy, tutorials, and personal projects. I am eager to join a team where I can contribute 
      my skills and continue learning from experienced developers. As a quick learner with excellent problem-solving skills, 
      I am confident that I can bring value to any team. If you're looking for a hardworking, self-motivated developer who is eager to learn and grow, 
      please don't hesitate to reach out to me."
    )


  
    # More users
    # phone_numbers = []
    20.times do 
        # phone_number = Faker::PhoneNumber.cell_phone_in_e164
        # while phone_numbers.include?(phone_number)
        #     phone_number = Faker::PhoneNumber.cell_phone_in_e164
        # end
        # phone_numbers << phone_number
    
        # puts "Generated phone number: #{phone_number}"
    
        User.create!({
            phone_number: Faker::PhoneNumber.unique.cell_phone_in_e164,
            email: Faker::Internet.unique.email,
            first_name: Faker::Name.first_name,
            last_name: Faker::Name.last_name,
            headline: 'student @ app academy',
            about: Faker::Quote.matz,
            location: Faker::Address.country,
            password: 'password'
        }) 
    end

    months = ["January", "February", "March", "April", "May", "June", 
          "July", "August", "September", "October", "November", "December"]

    i = 1
    while i < 22 do
      5.times do 
        start_year = rand(1990..2020)
        end_year = rand(start_year+1..2022)

        skills = '';
        3.times do 
          skills += + Faker::Job.key_skill + ' · '
        end

        Experience.create!({
          title: Faker::Job.unique.title,
          company: Faker::Company.unique.name,
          description: Faker::Company.unique.bs,
          start_month: months[rand(months.length)],
          start_year: start_year,
          user_id: i,
          location: Faker::Address.unique.country,
          end_month: months[rand(months.length)],
          end_year: end_year,
          skills: skills,
          logo: Faker::Company.logo
        })
      end

      education_start_year = rand(1980..2018)
      education_end_year = education_start_year + 4

      Education.create!({
        school: Faker::Educator.unique.university,
        degree: Faker::Educator.degree,
        user_id: i,
        start_month: months[rand(months.length)],
        start_year: education_start_year,
        end_month: months[rand(months.length)],
        end_year: education_end_year
      })
      i += 1
    end

    Post.create!({
      body: 'testing testing123!@^&*;',
      author_id: 1
    })

    Post.create!({
      body: '2testing2 2testing123!@^&*2;',
      author_id: 2
    })

    Post.first.photo.attach( io: URI.open("https://linkedup-seeds.s3.amazonaws.com/cat.jpg"),
    filename: "cat.jpg"
    )
  
    puts "Done!"
  # end
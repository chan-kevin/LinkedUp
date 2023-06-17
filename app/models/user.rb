# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  phone_number    :string
#  first_name      :string           not null
#  last_name       :string           not null
#  about           :text
#  location        :string
#  headline        :string
#
require 'open-uri'

class User < ApplicationRecord
  validates :email, length: { in: 3..255 }, format: { with: URI::MailTo::EMAIL_REGEXP }, uniqueness: true
  validates :phone_number, format: { with: /\A\+\d+\z/ }, uniqueness: true, on: :sign_in
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :session_token, presence: true, uniqueness: true
  validates :password, length: { in: 6..255 }, allow_nil: true
  before_validation :ensure_session_token, :generate_default_pic

  has_many :experiences, dependent: :destroy
  has_many :educations, dependent: :destroy

  has_many :posts, 
    foreign_key: :author_id,
    class_name: :Post,
    dependent: :destroy

  has_many :comments, 
    foreign_key: :commenter_id,
    class_name: :Comment,  
    dependent: :destroy

  has_many :likes,
  foreign_key: :liker_id,
  class_name: :Like,
  dependent: :destroy

  # has_many :sent_connections,
  #   class_name: :Connection,
  #   foreign_key: :connecter_id,
  #   dependent: :destroy

  # has_many :received_connections,
  #   class_name: :Connection,
  #   foreign_key: :connectee_id,
  #   dependent: :destroy


  # has_many :connections, 
  #   class_name: :Connection,
  #   foreign_key: :connecter_id,
  #   dependent: :destroy

  # has_many :connected_users,
  #   through: :connections,
  #   source: :connectee,
  #   foreign_key: :connectee_id

  has_one_attached :photo
  # has_many_attached :photos //will be an array

  def connections
    Connection.where("connecter_id = ? OR connectee_id = ?", self.id, self.id)
  end

  ### for pending connections
  ###  def pending conections
  ### find all the pending connections

  ### def is_pending(id)
  ### find whether a user has a pending connection with you


  # def connected_users
  #   self.joins(:Connection).joins(:User)
  # end

  def is_connected(id)
    !self.connections.where("connecter_id = ? OR connectee_id = ?", id, id).empty?
  end

  def find_connection(id)
    self.connections.where("connecter_id = ? OR connectee_id = ?", id, id).first
  end


  def self.find_by_credentials(credential, password)
    if URI::MailTo::EMAIL_REGEXP.match?(credential)
      user = User.find_by(email: credential)
    else
      user = User.find_by(phone_number: credential)
    end

    if user && !(user.authenticate(password))
      return 'incorrect password'
    elsif user&.authenticate(password)
      return user
    else
      nil
    end
  end

  def reset_session_token!
    self.session_token = generate_unique_session_token
    self.update!({session_token: self.session_token})
    self.session_token
  end
  has_secure_password

  def generate_default_pic
    unless self.photo.attached?
      file = URI.open("https://linkedup-seeds.s3.amazonaws.com/default-profile.jpeg");
      self.photo.attach(io: file, filename: "default.png")
    end
  end

  private

  def generate_unique_session_token
    token = SecureRandom.urlsafe_base64
    if User.exists?(token)
      token = SecureRandom.urlsafe_base64
    end
    token
  end

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end
end

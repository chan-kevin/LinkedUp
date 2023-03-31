class User < ApplicationRecord
  validates :email, length: { in: 3..255 }, format: { with: URI::MailTo::EMAIL_REGEXP }, uniqueness:true,
  validates :phone_number, length: { in: 3..255 }, format: { with: /\A\+\d+\z/ }, uniqueness:true
  validates :session_token, presence: true, uniqueness: true
  validates :password, length: { in: 6..255 }, allow_nil: true
  before_validation :ensure_session_token

  def self.find_by_credentials(credential, password)
    if URI::MailTo::EMAIL_REGEXP.match?(credential)
      user = User.find_by(email: credential)
    else
      user = User.find_by(phone_number: credential)
    end

    if user&.authenticate(password)
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

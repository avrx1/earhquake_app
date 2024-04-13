class Comment < ApplicationRecord
    validates :body, presence: true
    validates :feature_id, presence: true
end

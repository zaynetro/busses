module ApplicationHelper

  # Returns full page title
  def full_title(title = '')
    base = 'Bus timetables'
    if(title.empty?)
      base
    else
      "#{title} | #{base}"
    end
  end

end

module ApplicationHelper
  def markdown(text)
    Redcarpet::Markdown.new(Redcarpet::Render::HTML, {hard_wrap: true, filter_html: true, autolink: true, no_intraemphasis: true}).render(text)
  end
end

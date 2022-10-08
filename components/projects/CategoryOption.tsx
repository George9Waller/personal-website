import classNames from "classnames";
import { getCategoryClasses, ProjectCategories } from "../../utils/projects"

interface Props {
  category: ProjectCategories;
  dark?: boolean;
  onClick: (category: ProjectCategories) => void;
}

export const CategoryOption = ({ category, dark, onClick }: Props) => (
  <button
  className={classNames(
    "btn btn-sm",
    getCategoryClasses(category, true),
    dark && "opacity-50"
  )}
  onClick={() => onClick(category)}
>
  {category}
</button>
)

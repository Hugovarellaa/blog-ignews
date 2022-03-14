import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { cloneElement, ReactElement } from "react";

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  classNameActive: string;
}

export function ActiveLink({
  classNameActive,
  children,
  ...rest
}: ActiveLinkProps) {
  const { asPath } = useRouter();

  const className = asPath === rest.href ? classNameActive : "";

  return (
    <>
      <Link {...rest}>
        {cloneElement(children, {
          className,
        })}
      </Link>
    </>
  );
}

import { Directive, ElementRef, Host, inject, input } from "@angular/core";

@Directive({
  selector:'a[appSafeLink]',
  standalone: true,
  host:{
    '(click)': 'onConfirmLeavePage($event)'
  }
})
export class SafeLinkDirective{
  queryParam = input('myapp', {alias: 'appSafeLink'});
  private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

  constructor(){
    console.log("1");
  }

  onConfirmLeavePage(event: MouseEvent){
    const wantsToLeave = window.confirm("Do you want to leave?");
    if(wantsToLeave){
      const address = this.hostElementRef.nativeElement.href;
      this.hostElementRef.nativeElement.href = address + '?from=' + this.queryParam();
      return;
    }
    event.preventDefault();
  }
}

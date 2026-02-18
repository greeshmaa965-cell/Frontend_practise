import java.util.*;
class Main {
    public static void main(String[] args)
     {
         Scanner sc = new Scanner(System.in);
         System.out.printf("Enter the size of the array: ");
        int n=sc.nextInt();
        int []nums=new int[n];
        System.out.printf("Enter the elements of the array: ");
        for(int i=0;i<nums.length;i++)
        {
            nums[i]=sc.nextInt();
        }
        largestElement(nums);
        
       
    }
    public static void largestElement(int []nums)
    {
        Arrays.sort(nums);
        System.out.println(nums[nums.length-1]);
    }
}